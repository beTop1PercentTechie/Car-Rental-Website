import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaCalendarAlt, FaHeadset, FaShieldAlt, FaStar, FaArrowRight, FaMapMarkerAlt, FaUser, FaUserShield } from 'react-icons/fa';
import Chatbot from '../components/Chatbot';


function Home() {

  const [showLoginOptions, setShowLoginOptions] = useState(false)

  return (
    <div className='min-h-screen'>
      {/* Login/Profile Button with popup */}
      <div className="fixed top-0 right-0 m-6 z-50">
        <div className='relative'>
          <button 
            onClick={() => setShowLoginOptions(!showLoginOptions)}
            className='flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 shadow-lg'>
            <FaUser className='text-lg'/>
            <span className='font-semibold'>LOGIN</span>
          </button>

          {/* Login options popup */}
          {showLoginOptions && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2'>
              <Link className='flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-gray-700' to={'/login'}>
                <FaUser className='text-indigo-600'/>
                <span>User Login</span>
              </Link>

              <Link className='flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-gray-700' to={'/admin/login'}>
                <FaUser className='text-indigo-600' />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className='relative min-h-screen flex items-center' style={{
        backgroundImage: 'url("https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/07/opener-w-Bugatti-3.webp?size=*:675")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-3xl'>
            <h1 className='text-6xl md:text-8xl font-bold text-white mb-6'>
              Drive Your <span className='text-transparent bg-clip-text bg-gradient-to-r from bg-indigo-600 to to-blue-500'>Dreams</span>
            </h1>
            <p className='text-xl md:text-2xl text-gray-300 mb-12'>
            Experience luxury and comfort with our premium car rental service. Choose from our wide selection of vehicles at competitive prices.
            </p>
          </div>
        </div>
        {/* Stats front */}
        <div className='absolute bottom-3 left-0 right-0 z-20'>
          <div className='container mx-auto px-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6'>
              {[
                {value: '500+', label: 'Cars Available'},
                {value: '1000+', label: 'Happy Customers'},
                {value: '50+', label: 'Locations'},
                {value: '24/7', label:'Support'}
              ].map((stat, index) => (
                <div key={index} className='text-center text-white'>
                  <div className='text-4xl font-bold mb-2'>{stat.value}</div>
                  <div className='text-gray-300'>{stat.label}</div>
                </div>
              ))
              }
            </div>
          </div>  
        </div>
      </div>

      {/* Featured cars section */}
      <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Vehicles</h2>
            <p className="text-gray-400">Choose from our exceptional collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: 'Mercedes-Benz S-Class',
                image: 'https://www.carscoops.com/wp-content/uploads/2022/11/Ferrari_Vision_GT_front_02.jpg',
                price: 299,
                type: 'Luxury Sedan'
              },
              {
                id: 2,
                name: 'BMW X7',
                image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?ixlib=rb-4.0.3',
                price: 249,
                type: 'Luxury SUV'
              },
              {
                id: 3,
                name: 'bugati',
                image: 'https://autonews-mag.com/autolux/wp-content/uploads/2022/08/Bugatti-Chiron-Grand-Sport.jpeg',
                price: 399,
                type: 'Sports Car'
              }
            ].map((car) => (
              <div key={car.id} className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 transition-all duration-300 hover:transform hover:scale-105">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 p-4">
                  <h3 className="text-xl font-bold text-white">{car.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{car.type}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-white font-semibold">${car.price}/day</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-gray-800 to-gray-900" style={{
        backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/006/174/327/small/soft-and-elegant-black-gradient-background-abstract-free-vector.jpg")',
        backgroundBlendMode: 'overlay'
      }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FaCar, title: 'Premium Selection', desc: 'Luxury and comfort vehicles' },
              { icon: FaCalendarAlt, title: 'Easy Booking', desc: 'Quick reservation process' },
              { icon: FaHeadset, title: '24/7 Support', desc: 'Always here to help' },
              { icon: FaShieldAlt, title: 'Safe & Secure', desc: 'Fully insured vehicles' }
            ].map((feature, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <feature.icon className="text-5xl text-indigo-400 mb-6 group-hover:text-indigo-300 transition-colors" />
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 transform -skew-y-6"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">Ready for Your Next Adventure?</h2>
            <p className="text-xl text-white/80 mb-12">
              Get started with our easy booking process and experience the best in car rentals.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Now
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>



      </div>


      <Chatbot/>
    </div>
  )
}

export default Home