const db = require('../database/connection');
const Rooms = require('../database/rooms.schema');
const RoomSettings = require('../database/settings.schema');
const MESSAGE = require('./_common');

const getRooms = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        Rooms.find({userId: req.params.userId})
          .then((result) => {
            resolve({
              status: true,
              rooms: result
            });
          })
          .catch((error) => {
            resolve({
              status: false,
              message: error.message
            });
          })
      })
      .catch(() => {
        resolve({
          status: false,
          message: MESSAGE.error
        });
      })
  });
};

const createRoom = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        const room = new Rooms(req.body);

        room.save()
          .then((result) => {

              const options = new RoomSettings({
                roomId: result._id,
                options: [],
                config: {
                  connectGreetingsToTime: false,
                  textGreetings: '',
                  textEnd: '',
                  textStart: [],
                  configAreaTheme: '',
                  configAreaTextColor: '',
                  textAreaTheme: '',
                  textAreaTextColor: '',
                  textAreaCopyBackground: '',
                  isEnumerable: true,
                  showStartText: true,
                  showEndText: false
                }
              });

              options.save();

              resolve({
                status: true,
                room: result
              })
                .catch(e => console.log(e))
            }
          ).catch((error) => {
          resolve({
            status: false,
            message: error.message
          });
        });

      })
      .catch(() => {
        resolve({
          status: false,
          message: MESSAGE.error
        });
      })
  })
};

const renameRoom = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {

        Rooms.findOneAndUpdate({_id: req.body.roomId}, {name: req.body.name})
          .then(() => {
            resolve({
              status: true
            });
          })
          .catch((error) => {
            resolve({
              status: false,
              message: error.message
            });
          })
      })
      .catch(() => {
        resolve({
          status: false,
          message: MESSAGE.error
        });
      })
  });
};

const deleteRoom = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {

        Rooms.findOneAndRemove({_id: req.params.roomId})
          .then(() => {

            RoomSettings.findOneAndRemove({roomId: req.params.roomId})
              .then(() => {
                resolve({
                  status: true
                });
              })
          })
          .catch((error) => {
            resolve({
              status: false,
              message: error.message
            });
          })
      })
      .catch(() => {
        resolve({
          status: false,
          message: MESSAGE.error
        });
      })
  });
};

module.exports = {
  createRoom, getRooms, deleteRoom, renameRoom
};
