import { CountedVisitsLink } from '../models/countedVisitsLink';
import { Link } from '../models/link';

const getCountedVisits = (items: Link[]): CountedVisitsLink[] => {
  const last24Hrs = new Date(new Date().setDate(new Date().getDate() - 1));
  return items.map((item) => {
    const { visits } = item;
    const recentVisits = visits.filter(
      (visit) => last24Hrs < visit.createdAt,
    ).length;
    const prevVisits = visits.length - recentVisits;

    return {
      ...item,
      visits: {
        current: recentVisits ?? 0,
        change: prevVisits
          ? Math.ceil(((recentVisits - prevVisits) / prevVisits) * 100)
          : recentVisits * 100,
      },
    };
  });
};

export default getCountedVisits;
