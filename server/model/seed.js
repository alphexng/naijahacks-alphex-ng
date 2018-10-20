import bcrypt from "bcryptjs";
import db from "../db/";

const users = [
    {
        voter_id:'908877BGHT129IJ2019',
        firstname:'John',
        surname:'Doe',
        email:'johndoe@gmail.com',
        phone:'08012345678',
        address:'1, Makoko Area, Idumota, Lagos, Nigeria',
        lga_origin:'Okonanu South',
        lga_registered:'Igando West',
        state_of_origin:'Abia',
        state_registered:'Lagos'
    },
    {
        voter_id:'908276BGP3L29IJ2019',
        firstname:'Jane',
        surname:'Doe',
        email:'janedoe@gmail.com',
        phone:'09012345678',
        address:'5, Ijagun, Badagry, Lagos, Nigeria',
        lga_origin:'Shitta East',
        lga_registered:'Alimosho',
        state_of_origin:'Taraba',
        state_registered:'Lagos'
    },
    {
        voter_id:'902456BGP3L29IJ2019',
        firstname:'William',
        surname:'Ekaete',
        email:'william@gmail.com',
        phone:'08112345678',
        address:'5, Silver street, Ikot, Akwa-ibom, Nigeria',
        lga_origin:'Ikot',
        lga_registered:'Garki',
        state_of_origin:'Akwa-ibom',
        state_registered:'Abuja'
    }
];

users.forEach(x => {
    const userData = {
        text: `
        INSERT INTO users (
            voter_id,
            firstname,
            surname,
            email,
            phone,
            address,
            lga_origin,
            lga_registered,
            state_of_origin,
            state_registered
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        values: [
            x.voter_id,
            x.firstname,
            x.surname,
            x.email,
            x.phone,
            x.address,
            x.lga_origin,
            x.lga_registered,
            x.state_of_origin,
            x.state_registered
        ]
    }

    db.query(
        userData,
        (err,res) => {
            if (err) {
                throw err
            }else{
                console.log('Users Table Seeded');
            };
        }
    );
});

const adminName = process.env.ADMINNAME;
const adminUser = process.env.ADMINUSER;
const adminPass = bcrypt.hashSync(process.env.ADMINPASS);
const adminEmail = process.env.ADMINEMAIL;
const adminPhone = process.env.ADMINPHONE;
const adminRole = process.env.ADMINROLE;

const adminData = {
    text: `
    INSERT INTO admin (
        name,
        username,
        email,
        phone,
        password,
        role
    ) VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [adminName,adminUser,adminEmail,adminPhone,adminPass,adminRole]
};

db.query(
    adminData,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Table Seeded');
        };
    }
);
