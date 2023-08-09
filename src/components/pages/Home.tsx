import Featured from "../layout/Featured"
import ImageSlider from "../layout/ImageSlider"
import ShipmentIcons from "../layout/ShipmentIcons"

function Home() {
  return (
    <div className="pt-14">
      <ImageSlider />
      <Featured />
      <ShipmentIcons />
    </div>
  )
}
export default Home