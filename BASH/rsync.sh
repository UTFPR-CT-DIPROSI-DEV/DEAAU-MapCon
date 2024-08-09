#!/bin/bash
# Bastion SSH
# Conecta a um host da rede privada através do bastion host
# Autor: Wilson Horstmeyer Bogado <wilson@utfpr.edu.br>
#        Jhony Minetto Araújo <jhonyminettoaraujo@alunos.utfpr.edu.br>
BASTION_HOST=bastion.ct.utfpr.edu.br
PKEYFILE=$1
USERNAME=$2
SRC=$3
DEST=$4
eval "$(ssh-agent)" > /dev/null
ssh-add ${PKEYFILE} > /dev/null
# scp -o ForwardAgent=yes -J ${USERNAME}@${BASTION_HOST} ${SRC} ${DEST}
# rsync -avz --quiet -e "ssh -J ${USERNAME}@${BASTION_HOST}" ${SRC} ${DEST}
rsync -ahz --delete -e "ssh -J ${USERNAME}@${BASTION_HOST}" ${SRC} ${DEST}
eval "$(ssh-agent -k)" > /dev/null