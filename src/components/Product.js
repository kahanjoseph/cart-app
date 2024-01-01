import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Product = ({product}) => {
    return (
        <Card className={'mb-2'}>
            <Card.Body>
                <Card.Text>
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-4">
                                    <img src={product.image_url} alt={product.name} className={'w-100'}/>
                                </div>
                                <div className="col-8">
                                    {/* I found the css for this finicky */}
                                    <p>{product.name.length < 56 ?  product.name : product.name.substring(0, product.name.lastIndexOf(' ', 53)) + '...'}</p>
                                </div>
                            </div>
                            </div>
                        <div className="col-4">
                            <p>{product.seller_rank}</p>
                            <p>{product.price}</p>
                        </div>
                    </div>
                </Card.Text>
                <Button variant="primary">Add To Cart</Button>
            </Card.Body>
        </Card>
    );
}
Product.propTypes = {
    product: PropTypes.object.isRequired,
}
export default Product;
