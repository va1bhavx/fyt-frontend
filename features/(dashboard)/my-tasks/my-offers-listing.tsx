import OfferCard from "../tasks/task-details/offer-card"

export default function MyOffersListing() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((offerId) => (
        <OfferCard key={offerId} />
      ))}
    </div>
  )
}
