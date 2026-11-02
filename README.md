# taekyungkim918.github.io

[\*folio](https://github.com/bogoli/-folio)를 기반으로 만든 한 페이지짜리 개인 홈페이지입니다. GitHub Pages의 기본 Jekyll로 빌드되므로, gem 설치나 GitHub Actions 없이 push하면 배포됩니다.

원본 \*folio에서 바꾼 점은 다음과 같습니다.

- 테마 색을 `$red`에서 \*folio 팔레트의 `$blue`(#2698BA)로 바꿨습니다. 기본은 흰 배경의 밝은 모드이고, 헤더의 달 아이콘으로 다크 모드를 켤 수 있습니다(선택은 브라우저에 저장).
- Publication list는 Raleway 글꼴을 씁니다. 본인 이름은 굵은 파란색으로 자동 표시됩니다.
- 논문은 Selected / All / 분야별 탭으로 나눠 볼 수 있고, Preprints와 연도별로 묶입니다.
- 블로그, poetry, portfolio 예제와 데모 이미지(약 90MB)는 삭제했습니다.

## 파일 구조

```
_config.yml              사이트 제목, URL
_data/profile.yml        이름, 직함, 사진, 이메일, 링크, 자기소개 문단, 연구 주제 목록(research)
_data/publications.yml   논문 목록 (분야, selected, preprint, 링크)
_data/filters.yml        논문 탭의 이름과 순서 (첫 번째가 기본 보기)
_data/news.yml           소식
_data/service.yml        리뷰어 이력
_data/pub_links.yml      tools/bib2links.py가 만드는 추가 링크
_includes/paper.html     논문 한 편의 마크업
_sass/_base.scss         색상 변수 (밝은/다크 모드)
_sass/_layout.scss       헤더, 소개, news, 푸터
_sass/_publications.scss 논문 목록 스타일
js/main.js               다크 모드 토글, 논문 탭, 헤더 강조
index.html               페이지 본문
```

## 배포 전에 할 일

1. 프로필 사진을 `img/prof_pic.jpg`에, CV를 `assets/pdf/cv.pdf`에 넣습니다.
2. BibTeX 파일(`papers.bib` 등)에 있는 링크를 가져오려면 아래 명령을 실행합니다. 제목으로 매칭해 `_data/pub_links.yml`을 만들고, 매칭되지 않은 항목은 화면에 출력합니다.
   ```
   python3 tools/bib2links.py path/to/papers.bib
   ```
3. 기존 사이트를 GitHub Actions로 `gh-pages` 브랜치에 배포하고 있었다면, Settings → Pages의 Source를 **Deploy from a branch**, **main / (root)** 로 바꾸고 `.github/workflows/`는 삭제합니다. 바꾸기 전에 기존 사이트를 백업 브랜치로 남겨두세요.

## 로컬 미리보기

```
gem install jekyll
jekyll serve
```

## 자주 하는 수정

- **논문 추가:** `_data/publications.yml`의 해당 위치에 항목을 넣습니다. `areas`에는 태그를 여러 개 넣을 수 있고(예: `[physical, rep]`), 각 태그가 학회명 옆에 표시되며 해당하는 모든 탭에 논문이 나옵니다. 홈의 Selected 탭에 보이려면 `selected: true`, 아직 게재 전이면 `preprint: true`를 넣습니다. 링크는 `links:` 아래에 `paper`, `arxiv`, `code`, `project`, `video`, `slides`, `poster` 중 필요한 것만 씁니다.
- **탭 순서나 이름 변경:** `_data/filters.yml`을 수정합니다. `sel`과 `all` 외의 id는 논문의 `area` 값과 맞아야 합니다.
- **색 변경:** `_sass/_base.scss` 맨 위의 `--theme`(이름, 밑줄 등 강조색)과 `--link`(본문 링크와 논문 목록의 본인 이름)를 바꿉니다.

---

\*folio 테마는 Lia Bogoev의 작업이며 MIT License로 배포됩니다.

The MIT License (MIT)
Copyright (c) 2015 Lia Bogoev

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
