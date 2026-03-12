#!/usr/bin/env python3
"""
ViewLogic 파일 검증 Hook
- HTML 파일: Vue 템플릿 규칙 검증
- JS 파일: ViewLogic 패턴 규칙 검증

PostToolUse hook으로 Write/Edit 후 자동 실행됩니다.
"""

import sys
import io
import json
import re
import os

# Windows 환경에서 UTF-8 출력 보장
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")


def validate_html(file_path):
    """HTML 파일을 Vue 템플릿으로 검증합니다."""
    errors = []

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return []

    lines = content.split("\n")

    # ──────────────────────────────────────────
    # 1. <style> 태그 금지
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        if re.search(r"<style[\s>]|<style$", line, re.IGNORECASE):
            errors.append(
                f"[line {i}] <style> 태그 사용 금지. "
                "모든 CSS는 css/base.css에 작성하세요."
            )

    # ──────────────────────────────────────────
    # 2. <script> 태그 금지
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        if re.search(r"<script[\s>]|<script$", line, re.IGNORECASE):
            errors.append(
                f"[line {i}] <script> 태그 사용 금지. "
                "JavaScript는 logic/ 폴더의 .js 파일에 작성하세요."
            )

    # ──────────────────────────────────────────
    # 3. SVG-Vue 충돌 검사
    # ──────────────────────────────────────────
    has_svg = bool(re.search(r"<svg[\s>]", content, re.IGNORECASE))

    if has_svg:
        # xlink:href 사용 금지 (Vue 3에서 deprecated)
        for i, line in enumerate(lines, 1):
            if "xlink:href" in line:
                errors.append(
                    f"[line {i}] xlink:href는 Vue 3에서 지원하지 않습니다. "
                    "href를 사용하세요."
                )

        # <foreignObject> 사용 주의
        for i, line in enumerate(lines, 1):
            if re.search(r"<foreignObject", line, re.IGNORECASE):
                errors.append(
                    f"[line {i}] SVG <foreignObject>는 Vue 렌더링과 충돌할 수 있습니다. "
                    "가능하면 사용을 피하세요."
                )

        # SVG 내부에 Vue와 충돌하는 속성 (kebab-case → camelCase 필요)
        svg_camel_attrs = {
            "viewbox": "viewBox",
            "preserveaspectratio": "preserveAspectRatio",
            "basefrequency": "baseFrequency",
            "stddeviation": "stdDeviation",
            "clippathunits": "clipPathUnits",
            "gradientunits": "gradientUnits",
            "gradienttransform": "gradientTransform",
            "patternunits": "patternUnits",
            "patterntransform": "patternTransform",
            "spreadmethod": "spreadMethod",
            "startoffset": "startOffset",
            "textlength": "textLength",
            "lengthadjust": "lengthAdjust",
        }

        for i, line in enumerate(lines, 1):
            line_lower = line.lower()
            for wrong, correct in svg_camel_attrs.items():
                # 소문자로만 작성된 경우 (올바른 camelCase가 아닌 경우)
                pattern = rf'(?<![a-zA-Z]){wrong}(?=[=\s>])'
                if re.search(pattern, line_lower) and correct not in line:
                    errors.append(
                        f"[line {i}] SVG 속성 '{wrong}'은 camelCase '{correct}'로 작성해야 합니다."
                    )

    # ──────────────────────────────────────────
    # 4. Vue 금지 패턴
    # ──────────────────────────────────────────

    # v-if와 v-for 동시 사용 금지 (같은 요소에서)
    for i, line in enumerate(lines, 1):
        # 같은 태그에 v-if와 v-for가 동시에 있는지 확인
        if re.search(r"<\w+[^>]*\bv-for\b[^>]*\bv-if\b", line) or \
           re.search(r"<\w+[^>]*\bv-if\b[^>]*\bv-for\b", line):
            errors.append(
                f"[line {i}] 같은 요소에 v-if와 v-for를 함께 사용하지 마세요. "
                "<template v-for>로 감싸고 내부 요소에 v-if를 사용하세요."
            )

    # :key="index" 사용 금지 (고유 ID 사용)
    for i, line in enumerate(lines, 1):
        if re.search(r':key\s*=\s*["\']?\s*index\s*["\']?', line):
            errors.append(
                f"[line {i}] :key=\"index\" 사용 금지. "
                "item.id 등 고유한 값을 사용하세요."
            )

    # v-for에 :key 누락 검사
    for i, line in enumerate(lines, 1):
        match = re.search(r"<(\w+)([^>]*)\bv-for\b([^>]*)>", line)
        if match:
            tag_name = match.group(1)
            full_attrs = match.group(2) + match.group(3)
            if tag_name != "template" and ":key" not in full_attrs and "v-bind:key" not in full_attrs:
                errors.append(
                    f"[line {i}] <{tag_name}>에 v-for 사용 시 :key 바인딩이 필요합니다."
                )

    # HTML 속성 내 {{ }} 보간법 사용 금지 (v-bind 사용)
    for i, line in enumerate(lines, 1):
        # 속성값 안에 {{ }}가 있는 패턴
        if re.search(r'(?:class|id|href|src|style|name|value|type|placeholder|action|title|alt)\s*=\s*"[^"]*\{\{', line):
            errors.append(
                f"[line {i}] HTML 속성 내에서 {{{{ }}}} 보간법을 사용하지 마세요. "
                ":속성명 (v-bind) 디렉티브를 사용하세요. "
                '예: :href="url" 또는 :class="className"'
            )

    # 인라인 이벤트 핸들러 사용 금지 (Vue 디렉티브 사용)
    inline_events = [
        "onclick", "onchange", "onsubmit", "oninput", "onkeyup",
        "onkeydown", "onkeypress", "onmouseover", "onmouseout",
        "onfocus", "onblur", "onload", "onerror", "onscroll",
        "onresize", "ondblclick", "oncontextmenu",
    ]
    for i, line in enumerate(lines, 1):
        for event in inline_events:
            if re.search(rf'\b{event}\s*=', line, re.IGNORECASE):
                vue_event = event[2:]  # onclick → click
                errors.append(
                    f"[line {i}] 인라인 이벤트 핸들러 '{event}' 사용 금지. "
                    f'Vue 디렉티브 @{vue_event}="handler"를 사용하세요.'
                )

    # <component> 태그에 :is 속성 필수
    for i, line in enumerate(lines, 1):
        if re.search(r"<component(?!\s[^>]*(?::is|v-bind:is)\s*=)[^>]*>", line):
            errors.append(
                f"[line {i}] <component> 태그는 반드시 :is 속성과 함께 사용하세요."
            )

    # <textarea>에 v-model 사용 시 내부 콘텐츠 금지
    textarea_pattern = re.compile(
        r"<textarea[^>]*\bv-model\b[^>]*>(.+?)</textarea>", re.DOTALL
    )
    for match in textarea_pattern.finditer(content):
        inner = match.group(1).strip()
        if inner:
            # 줄 번호 계산
            pos = match.start()
            line_num = content[:pos].count("\n") + 1
            errors.append(
                f"[line {line_num}] <textarea>에 v-model 사용 시 "
                "태그 사이에 내용을 넣지 마세요. Vue에서 무시됩니다."
            )

    # Vue 예약 태그 잘못된 사용 검사
    # <transition>, <keep-alive>, <teleport>, <suspense>는 Vue 내장 컴포넌트
    # 일반 HTML 태그로 잘못 사용할 수 있음
    vue_builtin_components = ["transition", "keep-alive", "teleport", "suspense"]
    for i, line in enumerate(lines, 1):
        for comp in vue_builtin_components:
            # 닫는 태그 없이 self-closing으로 잘못 사용
            if re.search(rf"<{comp}\s*/\s*>", line, re.IGNORECASE):
                errors.append(
                    f"[line {i}] <{comp}>는 Vue 내장 컴포넌트입니다. "
                    f"올바르게 사용하세요: <{comp}>...</{comp}>"
                )

    # innerHTML 직접 사용 금지 (v-html 사용)
    for i, line in enumerate(lines, 1):
        if re.search(r'\binnerHTML\s*=', line):
            errors.append(
                f"[line {i}] innerHTML 직접 사용 금지. "
                'Vue의 v-html 디렉티브를 사용하세요.'
            )

    # document. API 직접 사용 금지 (Vue ref 사용)
    for i, line in enumerate(lines, 1):
        if re.search(r'\bdocument\.(getElementById|querySelector|querySelectorAll|getElementsBy)', line):
            errors.append(
                f"[line {i}] DOM 직접 접근 금지. "
                "Vue의 ref 또는 $refs를 사용하세요."
            )

    return errors


def validate_js(file_path):
    """JS 파일을 ViewLogic 패턴으로 검증합니다."""
    errors = []

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return []

    lines = content.split("\n")

    # ──────────────────────────────────────────
    # 1. Promise.then/catch 금지 (async/await 사용)
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        # 주석 라인 건너뛰기
        if stripped.startswith("//") or stripped.startswith("*") or stripped.startswith("/*"):
            continue
        if re.search(r"\.\s*then\s*\(", line):
            errors.append(
                f"[line {i}] .then() 사용 금지. async/await를 사용하세요."
            )
        if re.search(r"\.\s*catch\s*\(", line):
            # try-catch 블록 안이면 허용
            errors.append(
                f"[line {i}] .catch() 사용 금지. try/catch와 async/await를 사용하세요."
            )

    # ──────────────────────────────────────────
    # 2. window.location 직접 조작 금지
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("*"):
            continue
        if re.search(r"window\.location\.(hash|href)\s*=", line):
            errors.append(
                f"[line {i}] window.location.hash/href 직접 조작 금지. "
                "this.navigateTo()를 사용하세요."
            )

    # ──────────────────────────────────────────
    # 3. layout: false 금지 (null 사용)
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        if re.search(r"\blayout\s*:\s*false\b", line):
            errors.append(
                f"[line {i}] layout: false 대신 layout: null을 사용하세요."
            )

    # ──────────────────────────────────────────
    # 4. 경로 파라미터 직접 사용 금지 (쿼리 파라미터 사용)
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("*"):
            continue
        # navigateTo('/path/123') 같은 패턴 감지
        match = re.search(r"navigateTo\s*\(\s*['\"`]([^'\"`]+)['\"`]\s*\)", line)
        if match:
            path = match.group(1)
            # 경로에 숫자가 직접 포함된 경우 (동적 세그먼트)
            if re.search(r"/\d+", path):
                errors.append(
                    f"[line {i}] 경로에 파라미터를 직접 포함하지 마세요. "
                    "쿼리 파라미터를 사용하세요: "
                    "this.navigateTo('/path', {{ id: 123 }})"
                )

    # ──────────────────────────────────────────
    # 5. :key="index" 패턴 (문자열 내)
    # ──────────────────────────────────────────
    for i, line in enumerate(lines, 1):
        if re.search(r':key\s*=\s*["\']?\s*index\s*["\']?', line):
            errors.append(
                f"[line {i}] :key=\"index\" 사용 금지. 고유 ID를 사용하세요."
            )

    return errors


def is_project_file(file_path, project_dir):
    """프로젝트 내 파일인지 확인합니다."""
    try:
        file_abs = os.path.abspath(file_path).replace("\\", "/").lower()
        proj_abs = os.path.abspath(project_dir).replace("\\", "/").lower()
        return file_abs.startswith(proj_abs)
    except Exception:
        return False


def main():
    try:
        input_data = json.loads(sys.stdin.read())
    except (json.JSONDecodeError, Exception):
        sys.exit(0)

    file_path = input_data.get("tool_input", {}).get("file_path", "")

    if not file_path:
        sys.exit(0)

    # 프로젝트 디렉토리 확인
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", "")
    if project_dir and not is_project_file(file_path, project_dir):
        sys.exit(0)

    # 파일 존재 확인
    if not os.path.exists(file_path):
        sys.exit(0)

    # 확장자별 검증
    errors = []
    if file_path.endswith(".html"):
        errors = validate_html(file_path)
    elif file_path.endswith(".js"):
        errors = validate_js(file_path)
    else:
        sys.exit(0)

    if errors:
        error_msg = f"파일 검증 실패: {os.path.basename(file_path)}\n\n"
        for err in errors:
            error_msg += f"  - {err}\n"
        error_msg += "\n위 문제를 반드시 수정해주세요. HTML 파일은 Vue 템플릿이므로 일반 HTML 규칙이 아닌 Vue + ViewLogic 규칙을 따라야 합니다."

        result = {
            "decision": "block",
            "reason": error_msg,
        }
        print(json.dumps(result, ensure_ascii=False))
        sys.exit(0)

    # 검증 통과
    sys.exit(0)


if __name__ == "__main__":
    main()
