import PageLayout from "./components/layouts/PageLayout";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import RequireAuth from "@/services/RequireAuth.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductFormPage from "@/pages/ProductFormPage.tsx";
import ActivitiesPage from "./pages/ActivitiesPage";
import ActivityFormPage from "./pages/ActivityFormPage";

function App() {
	return (
		<>
			<PageLayout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<h2>404 Page not found</h2>} />
					<Route
						path={"/reservations"}
						element={
							<RequireAuth>
								<h2>Se reservationer</h2>
							</RequireAuth>
						}
					/>
					<Route
						path={"/booking"}
						element={
							<RequireAuth>
								<h2>Opret ny booking</h2>
							</RequireAuth>
						}
					/>

					<Route path={"/administration"}>
						<Route
							index
							element={
								<RequireAuth isAdmin={true}>
									<AdminDashboardPage />
								</RequireAuth>
							}
						/>

						<Route path="activities">
							<Route
								index
								element={
									<RequireAuth isAdmin={true}>
										<ActivitiesPage />
									</RequireAuth>
								}
							/>
							<Route
								path="form"
								element={
									<RequireAuth isAdmin={true}>
										<ActivityFormPage />
									</RequireAuth>
								}
							/>
						</Route>

						<Route path="products">
							<Route
								index
								element={
									<RequireAuth isAdmin={true}>
										<ProductsPage />
									</RequireAuth>
								}
							/>
							<Route
								path="form"
								element={
									<RequireAuth isAdmin={true}>
										<ProductFormPage />
									</RequireAuth>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</PageLayout>
			<Toaster />
		</>
	);
}

export default App;
