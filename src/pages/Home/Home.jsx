import Banner from "../../components/Banner/Banner"
import FeaturedClass from "../../components/FeaturedClass/FeaturedClass"
import NewsletterSubscribe from "../../components/NewsLetter/NewsletterSubscribe;"
import useRole from "../../hooks/useRole"


const Home = () => {

  return (
    <div>
      <h1>Welcome to StayVista</h1> 
     
    <Banner></Banner>
    <FeaturedClass></FeaturedClass>
    {/* <Testimonials></Testimonials> */} 
     <NewsletterSubscribe></NewsletterSubscribe>
    </div>
  )
}

export default Home
