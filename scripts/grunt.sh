DIR=`dirname $0`
ROOT=$DIR"/.."
GRUNT=$ROOT"/node_modules/.bin/grunt"

 $GRUNT $1 --base $ROOT

