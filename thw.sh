#!/bin/bash

git clone https://github.com/PLOS/allofplos

pip install -e allofplos

python -c "from allofplos.plos_corpus import create_test_plos_corpus; create_test_plos_corpus()"

git clone https://github.com/eseiver/xml_tutorial
