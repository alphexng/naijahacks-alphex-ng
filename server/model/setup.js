import db from '../db';

const createUsers = `
CREATE TABLE users (
    id serial PRIMARY KEY NOT NULL,
    voter_id VARCHAR(30) UNIQUE NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    surname VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone NUMERIC(15) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    lga_origin VARCHAR(30) NOT NULL,
    lga_registered VARCHAR(30) NOT NULL,
    state_of_origin VARCHAR(20) NOT NULL,
    state_registered VARCHAR(20) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createAdmin = `
CREATE TABLE admin (
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone NUMERIC(15) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createElection = `
CREATE TABLE election (
    id serial PRIMARY KEY NOT NULL,
    election_id VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(30) NOT NULL,
    date_start DATE,
    date_end DATE,
    created_by VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createCandidates = `
CREATE TABLE candidates (
    id serial PRIMARY KEY NOT NULL,
    candidate_id VARCHAR(20) UNIQUE NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    surname VARCHAR(20) NOT NULL,
    dob DATE,
    email VARCHAR(50) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    election_id VARCHAR(20) NOT NULL,
    political_party VARCHAR(30) NOT NULL,
    tenure NUMERIC(11) NOT NULL,
    current_office VARCHAR(30) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createVotes = `
CREATE TABLE votes (
    id serial PRIMARY KEY NOT NULL,
    voter_id VARCHAR(20) NOT NULL,
    candidate_id VARCHAR(20) NOT NULL,
    election_id VARCHAR(20) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createCollation = `
CREATE TABLE election_collation (
    id serial PRIMARY KEY NOT NULL,
    election_id VARCHAR(20) NOT NULL,
    election_title VARCHAR(50) NOT NULL,
    candidate_outcome TEXT NOT NULL,
    election_outcome TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

db.query(
    createUsers,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Users Table Added');
        };
    }
);

db.query(
    createAdmin,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Table Added');
        };
    }
);

db.query(
    createElection,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Election Table Added');
        };
    }
);

db.query(
    createCandidates,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Candidates Table Added');
        };
    }
);

db.query(
    createVotes,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Votes Table Added');
        };
    }
);

db.query(
    createCollation,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Collation Table Added');
        };
    }
);
