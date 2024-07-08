#!/bin/bash
# Bastion SSH
# Conecta a um host da rede privada através do bastion host
# Autor: Wilson Horstmeyer Bogado <wilson@utfpr.edu.br>
BASTION_HOST=bastion.ct.utfpr.edu.br
PKEYFILE=$1
DEST=$2
USERNAME=${DEST%\@*}
HOSTNAME=${DEST#*\@}

eval "$(ssh-agent)" > /dev/null
ssh-add ${PKEYFILE} > /dev/null
ssh -o ForwardAgent=yes -J ${USERNAME}@${BASTION_HOST} ${DEST}
eval "$(ssh-agent -k)" > /dev/null
