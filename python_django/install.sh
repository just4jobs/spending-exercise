virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
# create and activate virtualenv
virtualenv .venv
source .venv/bin/activate
# install dependencies
pip install -r requirements.txt
# run database migrations to e.g. create spending table
./manage.py migrate