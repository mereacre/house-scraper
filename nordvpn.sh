countries=( $(nordvpn countries) )
length=$((${#countries[@]}-1))
index=`shuf -i 1-$length -n 1`
nordvpn connect ${countries[$index]}
