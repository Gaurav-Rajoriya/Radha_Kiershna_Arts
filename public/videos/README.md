# Gallery video (optional)
The exhibition is rendered live in 3D, so no video is required.
To use a recorded fly-through later, put it here as `gallery.mp4` (H.264, muted, short GOP:
`ffmpeg -i in.mp4 -an -c:v libx264 -g 4 -crf 26 gallery.mp4`). It must show the SAME gallery
(charcoal wall, gold ceiling, track lights, marble floor, bronze frames). Video scrubbing is not wired in this version.
