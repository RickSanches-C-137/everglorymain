import express, { Application, Request, Response } from 'express'

import modules from './modules';
import path from 'path';
import Parcel from './models/parcel';
import { NotFoundException } from './utils/service-exception';
import bodyParser from 'body-parser';

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(modules);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.get('/', (req: Request, res: Response) => {
    res.render("index.ejs")
});
app.get('/createp', (req: Request, res: Response) => {
    res.render("createparcel.ejs")
});
app.get('/parcels', async (req: Request, res: Response) => {
    try {
        const parcels = await Parcel.find();

        // Render the parcels using a view template (e.g., EJS)
        res.render('parcels.ejs', { parcels });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
type ProgressStatus = 'Order Received' | 'Processing' | 'In Transit' | 'Delivered';

const progress: Record<ProgressStatus, number> = {
    'Order Received': 10,
    'Processing': 30,
    'In Transit': 60,
    'Delivered': 100,
};

const colors: Record<ProgressStatus, string> = {
    'Order Received': 'bg-blue-500',
    'Processing': 'bg-gray-500',
    'In Transit': 'bg-yellow-500',
    'Delivered': 'bg-green-500',
};
app.get('/tracker', async (req: Request, res: Response) => {
    const parcelId = req.query.parcelId as string;
    try {
        const parcel = await Parcel.findById(parcelId);
        if (!parcel) {
            return res.status(404).json({ error: 'Parcel not found' });
        }

        const status = parcel.status as ProgressStatus; // Type assertion

        const progressWidth = progress[status] || 0; // Use a default value of 0 if status is not found in progress object
        const progressColor = colors[status] || 'bg-gray-500';
        res.render('tracker.ejs', { progressWidth, progressColor, parcel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/tracker', async (req: Request, res: Response) => {
    const parcelId = req.body.parcelId;
    console.log("This is it", parcelId)
    try {
        const parcel = await Parcel.findById({ _id: parcelId });

        if (!parcel) {
            throw new NotFoundException('Strangely, cannot find parcel information');
        }

        console.log('Found parcel:', parcel);

        // Perform any additional logic or processing if needed

        res.redirect(`/tracker?parcelId=${parcel._id}`); // Redirect to another page
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Assuming you have a Parcel model and an associated router

// GET route for rendering the edit form
app.get('/parcels/:id/edit', async (req, res) => {
    try {
        const parcelId = req.params.id;
        const parcel = await Parcel.findById(parcelId);

        if (!parcel) {
            throw new NotFoundException('Parcel not found');
        }

        res.render('editParcel', { parcel });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/parcels/:id/edit', async (req, res) => {
    // Retrieve the parcel ID from the request parameters
    const parcelId = req.params.id;
    try {
        const updatedParcel = {
            itemName: req.body.itemName,
            from: req.body.from,
            to: req.body.to,
            sender: req.body.sender,
            receiver: req.body.receiver,
            currentLocation: req.body.currentLocation,
            date: req.body.date,
            status: req.body.status
        };

        const parcel = await Parcel.updateOne({ _id: parcelId }, updatedParcel)
        //Gets all parcels and parce them
        const parcels = await Parcel.find();
        res.render('parcels.ejs', { parcels });
        return parcel

    } catch (err) {

    }

});
app.post('/parcels/:id/delete', async (req, res) => {
    const parcelId = req.params.id;
    // Perform the deletion logic here, such as using a database query or API call
    await Parcel.deleteOne({ _id: parcelId })
    // Assuming the deletion is successful, you can redirect the user to the all parcels page
    const parcels = await Parcel.find();
    res.redirect('/parcels');
});

app.post('/submit-parcel', (req: Request, res: Response) => {
    const { itemName, from, to, receiver, sender, currentLocation, date, status } = req.body;

    try {
        const parcelData = {
            itemName,
            from,
            to,
            receiver,
            currentLocation,
            date,
            status,
            sender
        }
        const parcel = Parcel.create(parcelData)
        return parcel
    } catch (err) {
        console.log(err)
    }
});
app.use((_req, res, _next) => {
    res.status(404).json({
        message: 'Resource does not exist',
    });
});
export default app;