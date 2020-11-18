import { Router, Request, Response } from 'express';
import { connect, connection as mConnection, mongo, Types } from 'mongoose';

// Initializing router
const router: Router = Router();

// Connecting to the database
connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gridFS;

// Listeners of the connection
const connection = mConnection;
connection.on('error', (error) => console.log(error));
connection.once('open', () => {
  console.log('Connected to Database for images route');

  // Init stream
  gridFS = new mongo.GridFSBucket(connection.db, {
    bucketName: 'images',
  });
});

// GET ONE
router.get('/:filename', (req: Request, res: Response) => {
  gridFS.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        message: 'No files available',
      });
    }

    if (
      files[0].contentType === 'image/jpeg' ||
      files[0].contentType === 'image/png' ||
      files[0].contentType === 'image/svg+xml'
    ) {
      // render image to browser
      gridFS.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        message: 'Not an image',
      });
    }
  });
});

export function deleteImage(filename: String) {
  gridFS.find({ filename }).toArray((err, files) => {
    if (files[0] && files.length !== 0) {
      gridFS.delete(new Types.ObjectId(files[0]._id), (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log('Deleted successfully');
      });
    }
  });
}

export default router;
