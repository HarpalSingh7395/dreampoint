// app/contact/page.js
import ContactUsForm from '@/components/ContactUsForm';
import FAQSection from '@/components/FAQSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8 pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <section>
          <div>
            <div className="flex">
              <div className=" [perspective:400px] [transform-style:preserve-3d]">
                <div className="h-14 w-14 p-[4px] rounded-md bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 mx-auto relative origin-center"
                >
                  <div className="bg-charcoal rounded-[5px] h-full w-full relative z-20 flex justify-center items-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="tabler-icon tabler-icon-mail-filled h-6 w-6 text-white">
                      <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z">
                      </path>
                      <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z">
                      </path>
                    </svg>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-neutral-600 opacity-50 rounded-full blur-lg h-4 w-full mx-auto z-30">
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-[60%] mx-auto">
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-purple-600 blur-sm to-transparent h-[8px] w-[60%] mx-auto">
                  </div>
                </div>
              </div>
            </div>
            <h2 className="max-w-5xl mx-auto tracking-tight font-medium  bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-3xl md:text-5xl md:leading-tight text-left">
              <span data-br=":r1u:" data-brr="1" >Contact us</span>
            </h2>
            <h2 className="text-sm md:text-base max-w-4xl my-4 mx-auto font-normal text-left text-neutral-400">
              <span data-br=":r1v:" data-brr="1" >
                We're here to help! Fill out the form or use our contact details below to reach out to us.
              </span>
            </h2>
            <div className="text-sm mt-10">
              <p className="text-sm text-foreground">Email</p>
              <p className="text-sm text-neutral-400">contact@mypathshaala.com</p>
            </div>
            <div className="text-sm mt-4">
              <p className="text-sm text-foreground">Phone</p>
              <p className="text-sm text-neutral-400">+91 (123) 123 XX21</p>
            </div>
            <div className="text-sm mt-4">
              <p className="text-sm text-foreground">Support</p>
              <p className="text-sm text-neutral-400">support@mypathshaala.com</p>
            </div>
          </div>
        </section>

        <section>
          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardHeader>
              <CardTitle>
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactUsForm />
            </CardContent>
          </Card>
        </section>
      </div>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
        <div className="bg-white shadow-md rounded-lg p-4 h-96">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Map Embed Goes Here</p>
          </div>
        </div>
      </section> */}

      <FAQSection />
    </main>
  );
}