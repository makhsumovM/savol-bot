'use client'

import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/lib/store/store";

const queryClient = new QueryClient()

const Providers = ({children}: { children: ReactNode }) => {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}
export default Providers
