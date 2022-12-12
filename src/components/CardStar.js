import starDark from "../images/card-assets/star-dark.svg"
import starLight from "../images/card-assets/star-light.svg"
import { useSettings } from "../useSettings"

const CardStar = () => {
  const settings = useSettings().settings
  return (
    <img
      className="card-star"
      src={settings.theme === "dark" ? starDark : starLight}
      alt=""
    />
  )
}

export default CardStar
