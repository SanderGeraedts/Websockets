index=0;
for name in *.png
do
    ren "${name}" "${index}.txt"
    index=$((index+1))
done
pause;