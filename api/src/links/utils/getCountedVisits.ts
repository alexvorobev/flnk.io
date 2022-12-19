import { CountedVisitsLink } from '../models/countedVisitsLink';
import { Link } from '../models/link';

const getCountedVisits = (items: Link[]): CountedVisitsLink[] => {
  return items.map((item) => {
    return {
      ...item,
      visits: item.visits.length,
    };
  });
};

export default getCountedVisits;
