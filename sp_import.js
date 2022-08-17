const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();
//CSV TO JSON:https://www.convertcsv.com/csv-to-json.htm
//Replace:http://www.unit-conversion.info/texttools/replace-text/
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

let counter = 1;
let users_collection;
let skills_collection;
let schedule_collection;
let projects_collection;


const createUsers = async (record) => {
    try {
        var docRef = await users_collection.add(record);
        console.log('[ ', counter, ' ] People records created [id]:- ', docRef.id);
        counter++;
    } catch (error) {
        console.log(`Error at createRecord --> ${error}`);
    }
};

const createSkills = async (record) => {
    try {
        var docRef = await skills_collection.add(record);
        console.log('[ ', counter, ' ] Skill records created [id]:- ', docRef.id);
        counter++;
    } catch (error) {
        console.log(`Error at createSkills --> ${error}`);
    }
};

const createSchedules = async (record) => {
    try {
        var docRef = await schedule_collection.add(record);
        console.log('[ ', counter, ' ] Schedule records created [id]:- ', docRef.id);
        counter++;
    } catch (error) {
        console.log(`Error at createSchedules --> ${error}`);
    }
};

const createProjects = async (record) => {
    try {
        var docRef = await projects_collection.add(record);
        console.log('[ ', counter, ' ] project records created [id]:- ', docRef.id);
        counter++;
    } catch (error) {
        console.log(`Error at createProjects --> ${error}`);
    }
};
/**
 * Start the import job for the given action
 * @param {*} file path of the json file
 * @param {*} action can be one of following
 * importPersons, importSkills, importSchedules,importSProjects
 */
function execute(action, file) {
    const firestore = new Firestore({
        projectId: CREDENTIALS.project_id,
        credentials: {
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        }
    });
    
    counter = 1;
    let database = require(file);
    switch (action) {
        case "importPersons":
            users_collection = firestore.collection('test_user');
            for (let index = 0; index < database.length; index++) {
                let element = database[index];
                createUsers(element);
            }
            break;
        case "importSkills":
            skills_collection = firestore.collection('test_skills');
            for (let index = 0; index < database.length; index++) {
                let element = database[index];
                createSkills(element);
            }
            break;
        case "importSchedules":
            schedule_collection = firestore.collection('schedules');
            for (let index = 0; index < database.length; index++) {
                let element = database[index];
                createSchedules(element);
            }
            break;
        case "importSProjects":
            projects_collection = firestore.collection('projects');
            for (let index = 0; index < database.length; index++) {
                let element = database[index];
                createProjects(element);
            }
            break;
    }

}
//-------------------------------------------------------------------
//Main Function
//-------------------------------------------------------------------
var file = "./suitable_picture//17-08-2022/poacher_person.json";
execute("importPersons", file);