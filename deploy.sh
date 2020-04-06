#!/bin/bash
gcloud auth activate-service-account --key-file ./travis.json --project $PROJECT_ID

gcloud --quiet config set project $PROJECT_ID
gcloud --quiet config set compute/zone $CLOUDSDK_COMPUTE_ZONE

gcloud compute ssh --project $PROJECT_ID --zone $CLOUDSDK_COMPUTE_ZONE $INSTANCE -- './deploy.sh'