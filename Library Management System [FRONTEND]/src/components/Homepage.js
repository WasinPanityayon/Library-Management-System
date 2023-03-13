import HomepageFooter from './HomepageFooter'
import HomepageHeader from './HomepageHeader'

const Homepage = () => {
    return (
        <section className='layout'>
            <>
                <HomepageHeader />
                <div className="homepage_container">
                <section className='detail'>
                    <section className='detail_text'>
                        <div>LIBRARY MANAGEMENT</div>
                        <div>SYSTEM</div>
                    </section>
                </section>
                </div>
                <HomepageFooter />
            </>
        </section>
    )
}
export default Homepage