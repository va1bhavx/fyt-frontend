import OfferCard from "./offer-card"

export default function OfferCardsHolder() {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {[1, 2, 3, 4, 5].map((offerId) => (
        <OfferCard key={offerId} />
      ))}
    </div>
  )
}
