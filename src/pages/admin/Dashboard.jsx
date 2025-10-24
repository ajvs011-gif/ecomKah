import { getItems } from "../../utils/hook";
// import AllProducts from "./AllProducts";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.bazar);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);


  async function collectItems() {
    try {
      const data = await getItems();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    if (userInfo) {
      checkAdmin();
      collectItems();
    } else {
      navigate("/");
      toast.error("Please Sign In First !");
    }
  }, []);

  return (
    <div className=''>
      {loading ? (
        <Player
          autoplay
          loop
          src={Animation}
          style={{ height: "300px", width: "300px" }}
        ></Player>
      ) : (
        <AllProducts products={products} />
      )}
    </div>
  );
};

export default Dashboard;

