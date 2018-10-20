import db from '../db';

const removeUsers = `
DROP TABLE IF EXISTS users CASCADE
`;

const removeAdmin = `
DROP TABLE IF EXISTS admin CASCADE
`;

const removeElection = `
DROP TABLE IF EXISTS election CASCADE
`;

const removeCandidates = `
DROP TABLE IF EXISTS candidates CASCADE
`;

const removeVotes = `
DROP TABLE IF EXISTS votes CASCADE
`;

const removeCollation = `
DROP TABLE IF EXISTS election_collation CASCADE
`;

db.query(
    removeUsers,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Users Table Dropped');
        };
    }
);

db.query(
    removeAdmin,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Table Dropped');
        };
    }
);

db.query(
    removeElection,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Election Table Dropped');
        };
    }
);

db.query(
    removeCandidates,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Candidates Table Dropped');
        };
    }
);

db.query(
    removeVotes,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Votes Table Dropped');
        };
    }
);

db.query(
    removeCollation,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Collation Table Dropped');
        };
    }
);
