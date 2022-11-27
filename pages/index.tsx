import { getFeaturedEvents } from '../Dummy_data';
import EventList from '../components/events/EventList';
import { FeaturedEventsModel } from '../components/events/EventModel';


export default function HomePage() {

  const featuredEvents: FeaturedEventsModel[] = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}
