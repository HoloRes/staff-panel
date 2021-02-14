import ErrorPage from "next/error";

export default function PageNotFound() {
	return <ErrorPage statusCode={404} />
}
