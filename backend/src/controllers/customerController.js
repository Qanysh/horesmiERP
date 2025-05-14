const Customer = require('../models/customer');

exports.getAllCustomers = async function (req, res) {
    try {
        Customer.getAllCustomers((err, customers) => {
            if (err) {
                console.error('Error fetching customers:', err);
                return res.status(500).json({ error: 'Error fetching customers data' });
            }
            res.json(customers); // Отправляем данные JSON на фронтенд
        });
    } catch (err) {
        console.error('Unexpected error fetching customers:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getCustomerById = async function (req, res) {
    Customer.getCustomerById([req.params.customer_no], (err, customerCard) => {
        if (err) {
            console.error('Error fetching customer:', err);
            return res.status(500).json({ error: 'Error fetching customer' });
        }
        if (!customerCard || customerCard.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customerCard[0]); // Отправляем данные одного клиента JSON
    });
};

exports.createCustomer = function (req, res) {
    const newCustomer = {
        customer_no: req.body.customer_no,
        name: req.body.name,
        name2: req.body.name2,
        responsibility_center: req.body.responsibility_center,
        location_code: req.body.location_code,
        post_code: req.body.post_code,
        country_region_code: req.body.country_region_code,
        phone_no: req.body.phone_no,
        ic_partner_code: req.body.ic_partner_code,
        contact: req.body.contact,
        salesperson_code: req.body.salesperson_code,
        customer_posting_group: req.body.customer_posting_group,
        allow_multiple_posting_groups: req.body.allow_multiple_posting_groups,
        gen_bus_posting_group: req.body.gen_bus_posting_group,
        vat_bus_posting_group: req.body.vat_bus_posting_group,
        customer_price_group: req.body.customer_price_group,
        customer_disc_group: req.body.customer_disc_group,
        payment_terms_code: req.body.payment_terms_code,
        reminder_terms_code: req.body.reminder_terms_code,
        fin_charge_terms_code: req.body.fin_charge_terms_code,
        currency_code: req.body.currency_code,
        language_code: req.body.language_code,
        search_name: req.body.search_name,
        credit_limit_lcy: req.body.credit_limit_lcy,
        blocked: req.body.blocked,
        privacy_blocked: req.body.privacy_blocked,
        last_date_modified: req.body.last_date_modified,
        application_method: req.body.application_method,
        combine_shipments: req.body.combine_shipments,
        reserve: req.body.reserve,
        ship_to_code: req.body.ship_to_code,
        shipping_advice: req.body.shipping_advice,
        shipping_agent_code: req.body.shipping_agent_code,
        base_calendar_code: req.body.base_calendar_code,
        balance_lcy: req.body.balance_lcy,
        balance_due_lcy: req.body.balance_due_lcy,
        sales_lcy: req.body.sales_lcy,
        payments_lcy: req.body.payments_lcy,
        created_at: new Date(),
        updated_at: new Date()
    };


    if (!newCustomer.customer_no || !newCustomer.name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Customer.createCustomer(newCustomer, (err, result) => {
        if (err) {
            console.error('Error creating customer:', err);
            return res.status(500).json({ error: 'Failed to create customer' });
        }
        res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
    });
};

exports.updateCustomer = function (req, res) {
    const updatedCustomer = {
        customer_no: req.body.customer_no,
        name: req.body.name,
        name2: req.body.name2,
        responsibility_center: req.body.responsibility_center,
        location_code: req.body.location_code,
        post_code: req.body.post_code,
        country_region_code: req.body.country_region_code,
        phone_no: req.body.phone_no,
        ic_partner_code: req.body.ic_partner_code,
        contact: req.body.contact,
        salesperson_code: req.body.salesperson_code,
        customer_posting_group: req.body.customer_posting_group,
        allow_multiple_posting_groups: req.body.allow_multiple_posting_groups,
        gen_bus_posting_group: req.body.gen_bus_posting_group,
        vat_bus_posting_group: req.body.vat_bus_posting_group,
        customer_price_group: req.body.customer_price_group,
        customer_disc_group: req.body.customer_disc_group,
        payment_terms_code: req.body.payment_terms_code,
        reminder_terms_code: req.body.reminder_terms_code,
        fin_charge_terms_code: req.body.fin_charge_terms_code,
        currency_code: req.body.currency_code,
        language_code: req.body.language_code,
        search_name: req.body.search_name,
        credit_limit_lcy: req.body.credit_limit_lcy,
        blocked: req.body.blocked,
        privacy_blocked: req.body.privacy_blocked,
        last_date_modified: req.body.last_date_modified,
        application_method: req.body.application_method,
        combine_shipments: req.body.combine_shipments,
        reserve: req.body.reserve,
        ship_to_code: req.body.ship_to_code,
        shipping_advice: req.body.shipping_advice,
        shipping_agent_code: req.body.shipping_agent_code,
        base_calendar_code: req.body.base_calendar_code,
        balance_lcy: req.body.balance_lcy,
        balance_due_lcy: req.body.balance_due_lcy,
        sales_lcy: req.body.sales_lcy,
        payments_lcy: req.body.payments_lcy,
        created_at: req.body.created_at,
        updated_at: new Date()
    };


    if (!req.params.customer_no) {
        return res.status(400).json({ error: 'Customer ID is missing' });
    }

    Customer.updateCustomer(req.params.customer_no, updatedCustomer, (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ error: 'Failed to update customer' });
        }
        res.json({ message: 'Customer updated successfully', customer: updatedCustomer });
    });
};

exports.deleteCustomer = function (req, res) {
    Customer.deleteCustomer(req.params.customer_no, (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).json({ error: 'Failed to delete customer' });
        }
        res.json({ message: 'Customer deleted successfully' });
    });
};
