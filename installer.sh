#!/bin/bash

#set -x
#trap read debug

printf "Simplified installer for AtAVi - by Kern3lp4nic\n";

printf '
     e        d8        e      Y88b      / ,e,
    d8b     _d88__     d8b      Y88b    /   "
   /Y88b     888      /Y88b      Y88b  /   888
  /  Y88b    888     /  Y88b      Y888/    888
 /____Y88b   888    /____Y88b      Y8/     888
/      Y88b  "88_/ /      Y88b      Y      888

';

#Get settings from the config file

BASE_DIR=$(pwd);

# DEFAULT VALUES FOR CONFIG
# INSTALL_DEV switch to install also dev dependencies. Useful if you want to get tests working.
INSTALL_DEV=false
# RESET_REPO switch to choose if reset changes or just pull rebase to latest commit
RESET_REPO=false

# AMAZON LOGIN access key id and secret access key
AMAZON_LOGIN_ACCESS_KEY_ID=accessKeyIdTemporaneaLogin
AMAZON_LOGIN_SECRET_ACCESS_KEY=secretAccessKeyTemporaneaLogin

# AMAZON DATABASE access key id and secret access key
DATABASE_INTERACTION_KEY_ID=accessKeyIdTemporaneaDB
DATABASE_INTERACTION_SECRET_KEY=secretAccessKeyTemporaneaDB

# SLACK secret key
SLACK_SECRET_KEY=slackSecretKey

# Sourcing config from the config file
source ./installer_config.txt

function installNodeModules {
    printf "Installing node modules\n";
    npm install --silent;
    if ${INSTALL_DEV}; then
        npm install --silent --only=dev
    fi
}

function updateToMaster {
    printf "Updating $(pwd)\n";
    if ${RESET_REPO}; then
        git fetch
        git checkout master;
        git reset --hard origin/master
        git submodule update --init
    else
        git checkout master;
        git pull --rebase;
        git submodule update --init
    fi
}

#Test if node is available
if hash node 2>/dev/null; then
    NODE=node;
elif hash nodejs 2>/dev/null; then
    NODE=nodejs;
else
    printf "I can't use Node. Maybe it's not installed\n";
    exit 127;
fi

#Test if git is available
if !(hash git 2>/dev/null); then
    printf "I can't use git. Maybe it's not installed\n";
    exit 127;
fi

#Test if npm is available
if !(hash git 2>/dev/null); then
    printf "I can't use git. Maybe it's not installed\n";
    exit 127;
fi

#Test settings
if [ ${AMAZON_LOGIN_ACCESS_KEY_ID} == "accessKeyIdTemporaneaLogin" ]; then
    printf "WARNING!\tAMAZON_LOGIN_ACCESS_KEY_ID not set.\n"
fi
if [ ${AMAZON_LOGIN_SECRET_ACCESS_KEY} == "secretAccessKeyTemporaneaLogin" ]; then
    printf "WARNING!\tAMAZON_LOGIN_SECRET_ACCESS_KEY not set.\n"
fi
if [ ${DATABASE_INTERACTION_KEY_ID} == "accessKeyIdTemporaneaDB" ]; then
    printf "WARNING!\tDATABASE_INTERACTION_KEY_ID not set.\n"
fi
if [ ${DATABASE_INTERACTION_SECRET_KEY} == "secretAccessKeyTemporaneaDB" ]; then
    printf "WARNING!\tDATABASE_INTERACTION_SECRET_KEY not set.\n"
fi
if [ ${SLACK_SECRET_KEY} == "slackSecretKey" ]; then
    printf "WARNING!\tSLACK_SECRET_KEY not set.\n"
fi
printf "\nBEGINNING INSTALLATION\n\n"

#Update and clone of submodules
#updateToMaster;
git pull --rebase;
git submodule update --init --recursive;

##FRONT END BUILD

cd "$BASE_DIR/front-end/";

    installNodeModules;

cd "$BASE_DIR";

##BACK END BUILD

#back-end/Service/AmazonGetCode
cd "$BASE_DIR/back-end/Service/AmazonGetCode/"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/AmazonGetCode/config.json" <<< "{\"accessKeyId\":\"$AMAZON_LOGIN_ACCESS_KEY_ID\",\"secretAccessKey\":\"$AMAZON_LOGIN_SECRET_ACCESS_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR";

#back-end/Service/AmazonRefreshToken
cd "$BASE_DIR/back-end/Service/AmazonRefreshToken/"

    updateToMaster
    tee "$BASE_DIR/back-end/Service/AmazonRefreshToken/config.json" <<< "{\"accessKeyId\":\"$AMAZON_LOGIN_ACCESS_KEY_ID\",\"secretAccessKey\":\"$AMAZON_LOGIN_SECRET_ACCESS_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR";

#back-end/Service/ManageAdmin
cd "$BASE_DIR/back-end/Service/ManageAdmin/"

    updateToMaster

cd "$BASE_DIR/back-end/Service/ManageAdmin/adminservice";

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageAdmin/adminservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageAdmin/adminservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules

cd "$BASE_DIR/back-end/Service/ManageAdmin/adminservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageAdmin/"

cd "$BASE_DIR/back-end/Service/ManageAdmin/authservice";

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageAdmin/authservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageAdmin/authservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageAdmin/authservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageAdmin/"

    installNodeModules;

cd "$BASE_DIR";

#back-end/Service/ManageAuth
cd "$BASE_DIR/back-end/Service/ManageAuth/"

    updateToMaster

cd "$BASE_DIR/back-end/Service/ManageAuth/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageAuth/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules

cd "$BASE_DIR/back-end/Service/ManageAuth/"

    installNodeModules;

cd "$BASE_DIR";

#back-end/Service/ManageFirm
cd "$BASE_DIR/back-end/Service/ManageFirm/"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageFirm/authservice";

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageFirm/authservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageFirm/authservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageFirm/authservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageFirm/"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageFirm/firmservice";

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageFirm/firmservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageFirm/firmservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageFirm/firmservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageFirm/"

    installNodeModules;

cd "$BASE_DIR";

cd "$BASE_DIR/back-end/Service/ManageQuestion"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageQuestion/authservice"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageQuestion/authservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageQuestion/authservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageQuestion/authservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageQuestion"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageQuestion/questionservice"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageQuestion/questionservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageQuestion/questionservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageQuestion/questionservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageQuestion"

    installNodeModules;

cd "$BASE_DIR";

cd "$BASE_DIR/back-end/Service/ManageSlack/"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageSlack/authservice";

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageSlack/authservice/DatabaseInteraction"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageSlack/authservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageSlack/authservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageSlack/"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageSlack/slackservice";

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageSlack/slackservice/DatabaseInteraction"

    updateToMaster;

tee "$BASE_DIR/back-end/Service/ManageSlack/slackservice/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageSlack/slackservice"

    updateToMaster;

cd "$BASE_DIR/back-end/Service/ManageSlack/slackservice/Slack"

    updateToMaster;
    tee "$BASE_DIR/back-end/Service/ManageSlack/slackservice/Slack/config.json" <<< "{\"tokenSlack\":\"$SLACK_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageSlack/slackservice"

    installNodeModules;

cd "$BASE_DIR/back-end/Service/ManageSlack/"

    installNodeModules;

cd "$BASE_DIR";

cd "$BASE_DIR/back-end/Skill";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack/DatabaseInteraction";

    updateToMaster;
    tee "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack/Slack";

    updateToMaster;
    tee "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack/Slack/config.json" <<< "{\"tokenSlack\":\"$SLACK_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/InfoSlack";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/Slack";

    updateToMaster;
    tee "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack/Slack/config.json" <<< "{\"tokenSlack\":\"$SLACK_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/MessageSlack";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/ActionsModules/";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/FirmService";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/FirmService/DatabaseInteraction";

    updateToMaster;

tee "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/FirmService/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions/FirmService";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/Actions";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/FirmService/";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/FirmService/DatabaseInteraction";

    updateToMaster;
    tee "$BASE_DIR/back-end/Skill/LambdaSkill/FirmService/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/FirmService/";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/LogService";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/LogService/DatabaseInteraction";

    updateToMaster;
    tee "$BASE_DIR/back-end/Skill/LambdaSkill/LogService/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/LogService";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionActions";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionActions/QuestionActionsModules";

    updateToMaster;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionActions";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionService";

    updateToMaster;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionService/DatabaseInteraction";

    updateToMaster;
    tee "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionService/DatabaseInteraction/Config.json" <<< "{\"accessKeyId\":\"$DATABASE_INTERACTION_KEY_ID\",\"secretAccessKey\":\"$DATABASE_INTERACTION_SECRET_KEY\"}" > /dev/null;
    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/QuestionService";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill/LambdaSkill/";

    installNodeModules;

cd "$BASE_DIR/back-end/Skill";

    installNodeModules;

cd "$BASE_DIR";

printf "\n\nInstallation completed successfully!\nNow you should create the relative lambda functions on AWS as explained in the documentation.\n";
