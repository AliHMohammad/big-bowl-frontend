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
import BookingCalenderPage from "./pages/BookingCalenderPage";
import UserBookingsPage from "./pages/UserBookingsPage";
import UserEditBookingFormPage from "./pages/UserEditBookingFormPage";
import ContentLayout from "./components/layouts/ContentLayout";
import UserCreateBookingPage from "./pages/UserCreateBookingPage";

function App() {
	return (
		<>
			<PageLayout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<h2>404 Page not found</h2>} />
					<Route path={"/reservations"}>
						<Route
							index
							element={
								<RequireAuth>
									<ContentLayout>
										<UserBookingsPage />
									</ContentLayout>
								</RequireAuth>
							}
						/>
						<Route
							path="form"
							element={
								<RequireAuth>
									<ContentLayout>
										<UserEditBookingFormPage />
									</ContentLayout>
								</RequireAuth>
							}
						/>
					</Route>
					<Route
						path={"/booking"}
						element={
							<RequireAuth>
								<ContentLayout>
									<UserCreateBookingPage />
								</ContentLayout>
							</RequireAuth>
						}
					/>
					<Route path={"/administration"}>
						<Route
							path="calender"
							index
							element={
								<RequireAuth isAdmin={true}>
									<ContentLayout>
										<BookingCalenderPage />
									</ContentLayout>
								</RequireAuth>
							}
						/>
						<Route
							index
							element={
								<RequireAuth isAdmin={true}>
									<ContentLayout>
										<AdminDashboardPage />
									</ContentLayout>
								</RequireAuth>
							}
						/>

						<Route path="activities">
							<Route
								index
								element={
									<RequireAuth isAdmin={true}>
										<ContentLayout>
											<ActivitiesPage />
										</ContentLayout>
									</RequireAuth>
								}
							/>
							<Route
								path="form"
								element={
									<RequireAuth isAdmin={true}>
										<ContentLayout>
											<ActivityFormPage />
										</ContentLayout>
									</RequireAuth>
								}
							/>
						</Route>
						<Route path="products">
							<Route
								index
								element={
									<RequireAuth isAdmin={true}>
										<ContentLayout>
											<ProductsPage />
										</ContentLayout>
									</RequireAuth>
								}
							/>
							<Route
								path="form"
								element={
									<RequireAuth isAdmin={true}>
										<ContentLayout>
											<ProductFormPage />
										</ContentLayout>
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
