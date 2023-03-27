import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(
    ...auths,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).end();
        }
        
        const response = await req.db.collection('active-delivery-operators').find({
            location: {
                $nearSphere: {
                    $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(req.query.requestCoordinatesLat), parseFloat(req.query.requestCoordinatesLon)]
                     },
                     $maxDistance: 30000
                }
            }
        }).toArray();

        if (!response) {
            return res.status(404).json({ error: { message: 'Post is not found.' } });
        }

        return res.json({result: 'success', operators: response });
    }
);

export default handler;