const ProgrammingContest = require('../models/ProgrammingContest.models');
const { v4: uuidv4 } = require('uuid');
const mail = require("./mail");

const getPC = (req, res) => {
  res.render('programming-contest/register.ejs', { error: req.flash('error') });
};


const postPC = (req, res) => {
  const {teamName,institute,coachName,coachContact,coachEmail,coachTshirt,TLName,TLContact,
    TLEmail,TLtshirt,TM1Name,TM1Contact,TM1Email,TM1tshirt,TM2Name,TM2Contact,TM2Email,TM2tshirt} = req.body;

  const total = 800;
  const paid = 0;
  const selected = false;
  let error = '';

  ProgrammingContest.findOne({ teamName: teamName, institute: institute }).then(
    (team) => {
      if (team) {
        error = 'Team with same name and institution exists';
        req.flash('error', error);
        res.redirect('/ProgrammingContest/register');
      } else {
        const key=uuidv4()
        const participant = new ProgrammingContest({
          teamName,institute,coachName,coachContact,coachEmail,coachTshirt,TLName,TLContact,TLEmail,TLtshirt,
          TM1Name,TM1Contact,TM1Email,TM1tshirt,TM2Name,TM2Contact,TM2Email,TM2tshirt,total,paid,selected,key});
        participant
          .save()
          .then(() => {
            error =
              'Team for Programming Contest has been registered successfully!!';
              mail(coachEmail,"Programming Contest", key,coachName)
              mail(TLEmail,"Programming Contest", key,TLName)
              mail(TM1Email,"Programming Contest", key,TM1Name)
              mail(TM2Email,"Programming Contest", key,TM2Name)
              req.flash('error', error);
            res.redirect('/ProgrammingContest/register');
          })
          .catch(() => {
            error = 'Unexpected error';
            console.log('error ', error);
            req.flash('error', error);
            res.redirect('/ProgrammingContest/register');
          });
      }
    }
  );
};



const getPCList = (req, res) => {
  let all_participant = [];
  let error = '';
  ProgrammingContest.find()
    .then((data) => {
      all_participant = data;
      res.render('programming-contest/list.ejs', {
        error: req.flash('error'),
        participants: all_participant,
      });
    })
    .catch(() => {
      error = 'Failed to fetch participants';
      res.render('programming-contest/list.ejs', {
        error: req.flash('error', error),
        participants: all_participant,
      });
    });
};



const deletePC = (req, res) => {
  const id = req.params.id;
  console.log('id ', id);

  let error = '';
  ProgrammingContest.deleteOne({ _id: req.params.id })
    .then(() => {
      error = '';
      req.flash('error', error);
      res.redirect('/ProgrammingContest/list');
    })
    .catch(() => {
      error = 'Failed to delete data!';
      req.flash('error', error);
      res.redirect('/ProgrammingContest/list');
    });
};


const paymentDonePC = (req, res) => {
  const id = req.params.id;

  ProgrammingContest.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          let error = 'Payment completed succesfully';
          req.flash('error', error);
          res.redirect('/ProgrammingContest/list');
        })
        .catch(() => {
          let error = 'Data could not be updated';
          req.flash('error', error);
          res.redirect('/ProgrammingContest/list');
        });
    })
    .catch(() => {
      let error = 'Data could not be updated';
      req.flash('error', error);
      res.redirect('/ProgrammingContest/list');
    });
};


const getEditPC = (req, res) => {
  const id = req.params.id;
  let info = [];
  ProgrammingContest.findOne({ _id: id })
    .then((data) => {
      info = data;

      res.render('programming-contest/edit.ejs', {
        error: req.flash('error'),
        participant: info,
      });
    })
    .catch((e) => {
      console.log(e);
      error = 'Failed to fetch participants';
      res.render('programming-contest/edit.ejs', {
        error: req.flash('error', error),
        participant: info,
      });
    });
};


const postEditPC = async (req, res) => {
  const {
    teamName,institute,coachName,coachContact,coachEmail,coachTshirt,TLName,TLContact,
    TLEmail,TLtshirt,TM1Name,TM1Contact,TM1Email,TM1tshirt,TM2Name,TM2Contact,TM2Email,TM2tshirt
  } = req.body;

  console.log(
    teamName,institute,coachName,coachContact,coachEmail,coachTshirt,TLName,TLContact,
    TLEmail,TLtshirt,TM1Name,TM1Contact,TM1Email,TM1tshirt,TM2Name,TM2Contact,TM2Email,TM2tshirt
  );

  const data = await ProgrammingContest.findOneAndUpdate(
    { teamName: teamName, institute: institute },
    {
      teamName,institute,coachName,coachContact,coachEmail,coachTshirt,TLName,TLContact,
    TLEmail,TLtshirt,TM1Name,TM1Contact,TM1Email,TM1tshirt,TM2Name,TM2Contact,TM2Email,TM2tshirt
    }
  );
  if (data) {
    console.log('findOneAndUpdate prog contest ', data);
    res.redirect('/ProgrammingContest/list');
  }
};



const selectPC = (req, res) => {
  const id = req.params.id;

  ProgrammingContest.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;
      participant
        .save()
        .then(() => {
          let error = 'Participant has been selected succesfully';
          req.flash('error', error);
          res.redirect('/ProgrammingContest/list');
        })
        .catch(() => {
          let error = 'Data could not be updated';
          req.flash('error', error);
          res.redirect('/ProgrammingContest/list');
        });
    })
    .catch(() => {
      let error = 'Data could not be updated';
      req.flash('error', error);
      res.redirect('/ProgrammingContest/list');
    });
};

module.exports = {
  getPC,
  postPC,
  getPCList,
  deletePC,
  paymentDonePC,
  selectPC,
  getEditPC,
  postEditPC,
};