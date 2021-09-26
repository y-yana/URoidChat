#for HEROKU

FROM python:3.6

ARG project_dir=/projects/

#ADD ./src/requirements.txt $project_dir
#WORKDIR $project_dir
ADD ./src /opt/src/
WORKDIR /opt/src

# install heroku cli
RUN curl https://cli-assets.heroku.com/install.sh | sh

#RUN pip install -r requirements.txt
RUN pip install --no-cache-dir -q -r requirements.txt
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libgl1-mesa-dev

ENV FLASK_APP 'app.py'

CMD gunicorn --bind 0.0.0.0:$PORT wsgi