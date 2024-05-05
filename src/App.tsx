import PageLayout from "./components/layouts/PageLayout";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";



function App() {
	return (
		<>
			<PageLayout>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="*" element={<h2>404 Page not found</h2>}/>


					{/*<Route path="/products" >
						<Route index element={<ProductListPage/>}/>
						<Route path=":id" element={<DetailedProductPage/>}/>
					</Route>*/}
				</Routes>
			</PageLayout>
			<Toaster/>
		</>
	);
}

export default App;
