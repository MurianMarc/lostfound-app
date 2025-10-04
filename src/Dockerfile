FROM alpine:latest

WORKDIR /app
COPY ./pocketbase ./pocketbase


CMD ["./pocketbase", "serve", "--http=0.0.0.0:10000", "--dir", "./pb_data"]
