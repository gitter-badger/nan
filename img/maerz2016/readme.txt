convert -strip -interlace Plane -quality 75% -resize 300x *.jpg -set filename:f '%t' '%[filename:f].web.jpg'
