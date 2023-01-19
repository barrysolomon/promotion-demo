#!/bin/bash

echo "CURRENT STATE OF WHATEVER"

echo "=> CPLN_GVC = ${CPLN_GVC}"

echo "============================="
echo "----- cpln-gvc.yaml -----"
cat ./cpln/cpln-gvc.yaml
echo "----- cpln-workload.yaml ----- "
cat ./cpln/cpln-workload.yaml 
echo "----- printenv ----- "
printenv 
echo "============================="
