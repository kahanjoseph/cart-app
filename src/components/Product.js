import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Product = ({product, btnClicked, btnText, children}) => {
    return (
        <Card className={'mb-2 position-static'}>
            <Card.Body>
                <div className="row border-bottom mb-2">
                    <div className="col-12 col-lg-8">
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                <img src={product.image_url} alt={product.name} className={'mw-100'} style={{maxHeight:'70px'}}/>
                            </div>
                            <div className="col-12 col-lg-9">
                                {/* I found the css for this finicky */}
                                <p>{product.name.length < 56 ?  product.name : product.name.substring(0, product.name.lastIndexOf(' ', 53)) + '...'}</p>
                            </div>
                        </div>
                        </div>
                    <div className="col-12 col-lg-4">
                        <p className={'mb-2 text-center text-lg-start'}>Rank: {product.seller_rank}</p>
                        <p className={'mb-2 text-center text-lg-start'}>Price: ${product.price}</p>
                        {children}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 offset-lg-8 d-grid gap-2" onClick={() => btnClicked(product.id)}>
                        <Button variant="primary" className={'btn-block'}>{btnText}</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
Product.propTypes = {
    product: PropTypes.object.isRequired,
    btnClicked: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    children: PropTypes.any,
}
export default Product;
