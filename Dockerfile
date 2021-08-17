FROM python:3.6

ARG project_dir=/projects/

ADD src/requirements.txt $project_dir

WORKDIR $project_dir

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libgl1-mesa-dev
RUN pip install -r requirements.txt