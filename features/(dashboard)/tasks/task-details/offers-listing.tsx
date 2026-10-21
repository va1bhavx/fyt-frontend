import OfferCardsHolder from "./offer-cards-holder"

export default function OffersListing() {
  return (
    <section className="min-w-0 space-y-3 border-t pt-5">
      <h4 className="text-sm font-semibold">Offers</h4>
      <OfferCardsHolder />
    </section>
  )
}
