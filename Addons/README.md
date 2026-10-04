# 애드온 시연 영상

애드온 영상은 카드 미리보기와 상세 모달에서 같은 파일을 사용합니다.

| 애드온 | 시연 영상 경로 | 임시 썸네일 |
| --- | --- | --- |
| Hyper NLA Exporter | `Addons/HyperNLA_Video.mp4` | `HyperNLA_thumbnail.svg` |
| Profile Wall Generator | `Addons/ProfileWall_Video.mp4` | `ProfileWall_thumbnail.svg` |

1. 해당 시연 영상을 위 경로로 저장합니다.
2. `index.html`의 해당 애드온 카드 안에서 영상 파일을 가리키는 `<source>` 주석 두 곳을 해제합니다.
3. 브라우저를 새로고침합니다. 영상 로드가 완료되면 ‘영상 준비 중’ 안내가 영상으로 바뀝니다.

카드는 마우스를 올리면 무음 반복 재생하고, 상세 모달은 재생 컨트롤을 제공합니다.
영상이 없거나 로드에 실패하면 안내 공간이 유지됩니다.

두 SVG 썸네일은 실제 Blender 화면을 대신하는 워크플로 도식입니다.
실제 썸네일이 준비되면 `index.html`의 해당 이미지 경로를 변경하세요.

Profile Wall Generator 권장 시연 순서: Curve 경로 작성 → 벽 생성 → 프로파일·두께·재질 조절 → 원본 Curve 편집과 자동 갱신 → 편집 가능한 Mesh로 전환.
