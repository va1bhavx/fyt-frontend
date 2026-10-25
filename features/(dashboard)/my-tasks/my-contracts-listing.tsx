import ContractCard from "./contract-card"

export default function MyContractsListing() {
  return (
    <div className="flex w-full flex-col gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, offerId) => (
        <ContractCard key={offerId} />
      ))}
    </div>
  )
}
