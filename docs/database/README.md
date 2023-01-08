# Note về database

## Bảng `users`

- role gồm 3 role:
    - 0 cho admin
    - 1 cho giáo viên
    - 2 cho học sinh
- status biểu thị trạng thái
    - 0 là chưa xác thực
    - 1 là đã xác thực (bình thường)
    - 2 là bị khoá

## Bảng `watch_status`

- status có giới hạn từ 0 tới 100

## Bảng `courses`

- status biểu thị trạng thái
    - 0 là chưa hoàn thành
    - 1 là hoàn thành
    - 2 là bị khoá

## Bảng `lectures`

- length là độ dài của video tính theo giây
