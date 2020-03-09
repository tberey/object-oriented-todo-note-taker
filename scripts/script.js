// Global Space. Full scope needed.
var entriesArray = [];
var entriesNumber = 0;

// Wait for page to be ready before init.
if (document.addEventListener) document.addEventListener("DOMContentLoaded", initialised, false);
else window.onload = initialised;

// Set event listeners, which will extrapolate any form data, for a create/update request to any entry.
function initialised() {
    // Create a new entry.
    document.getElementById('new-entry').addEventListener('click', () => {
        let formTitle = document.getElementById('title-input');
        let formBody = document.getElementById('body-input');
        let formTargetDate = document.getElementById('target-input');
        createEntry(formTitle, formBody, formTargetDate); // Pass in form data as arguments.
    });

    // Update an exisitng specified entry.
    document.getElementById('update-entry').addEventListener('click', () => {
        let formTitle = document.getElementById('title-input');
        let formBody = document.getElementById('body-input');
        let formTargetDate = document.getElementById('target-input');
        let formID = document.getElementById('id-input');
        updateEntry(formTitle, formBody, formTargetDate, formID); // Pass in form data as arguments.
    });
}

// Class constructor, to build a new entry as an object with properties, taken from passed input data.
class Entry {
    constructor(title, body, targDate) {
        entriesNumber+=1;
        this.ID = `N${entriesNumber}-${Math.abs(Math.floor((Math.random() * 99999999999) - (Math.random() * 2468013579)))}`;
        this.totalNotes = entriesNumber;
        this['Time & Date'] = `${('0' + ((new Date).getHours()+1)).slice(-2)}:${('0' + ((new Date).getMinutes()+1)).slice(-2)} - ${(new Date()).toDateString()}.`;
        this.Title = title;
        this.Body = body;
        this['Target Date'] = (targDate.indexOf('NaN') == -1) ? targDate : '[no target date & time set]';
        this.Done = false;
    }
}

// Create our new note, by init each new entry (as an object), with the data extrapolated and passed through.
function createEntry(userTitle, userBody, userTargetDate) {
    if (userTitle.value && userBody.value) {

        // Parse and format user's entered date.
        let fmtUsrTarDate = (new Date(userTargetDate.value));
        fmtUsrTarDate = (('0' + fmtUsrTarDate.getDate()).slice(-2) + '-' + ('0' + (fmtUsrTarDate.getMonth()+1)).slice(-2) + '-' + fmtUsrTarDate.getFullYear() + '; @ ' + ('0' + fmtUsrTarDate.getHours()).slice(-2) + ':' + ('0' + fmtUsrTarDate.getMinutes()).slice(-2));
        
        // Create new entry.
        let newEntryItem = new Entry(userTitle.value, userBody.value, fmtUsrTarDate);
        
        // Clear fields after successful submission
        userTitle.value = '';
        userBody.value = '';
        document.querySelector('#notesOutput').innerHTML = '';

        // Append new note to end of array.
        entriesArray.push(newEntryItem); // Array of entries, as objects.

        // Show the last entry added to our array, appended into HTML DOM structure.
        document.querySelector('#notesOutput').insertAdjacentHTML('beforeend',
            `<span class="entries">
            <i><sup><b>ID:</b> ${entriesArray[entriesArray.length-1].ID}</sup></i><br>
            <b>Time & Date Created: </b><p>${entriesArray[entriesArray.length-1]['Time & Date']}</p>
            <b>TITLE: </b><p>${entriesArray[entriesArray.length-1].Title}</p>
            <b>BODY: </b><p>${entriesArray[entriesArray.length-1].Body}</p>
            <b>DUE: </b><p>${entriesArray[entriesArray.length-1]['Target Date']}</p>
            </span><hr>`
        );
    } else {
        alert('Please complete all fields!'); // Error handling: Missing data.
    }
}

// Show all the entries currently in the notes array.
function showAll() {
    if (entriesArray.length) {
        document.querySelector('#notesOutput').innerHTML = '';
        for (let i = 0; i < entriesArray.length; i++) {
            // Append all entries into HTML DOM output.
            document.querySelector('#notesOutput').insertAdjacentHTML('beforeend',
                `<span class="entries">
                <i><sup><b>ID:</b> ${entriesArray[i].ID}</sup></i><br>
                <b>Time & Date Created: </b><p>${entriesArray[i]['Time & Date']}</p>
                <b>TITLE: </b><p>${entriesArray[i].Title}</p>
                <b>BODY: </b><p>${entriesArray[i].Body}</p>
                <b>DUE: </b><p>${entriesArray[i]['Target Date']}</p>
                </span><hr>`
            );
        }
    } else document.querySelector('#notesOutput').innerHTML = 'No Notes Found!'; // Error handling: Missing data.
}

// Show a single specified entry from our current array.
function showEntry() {
    document.querySelector('#notesOutput').innerHTML = '';
    let id = document.querySelector('#id-input').value;
    if (id) {
        let matches;
        for (let i = 0; i < entriesArray.length; i++) {
            // Find and display queried id.
            if (id == entriesArray[i].ID) {
                // Append all entries into HTML DOM output.
                document.querySelector('#notesOutput').insertAdjacentHTML('beforeend',
                    `<span class="entries">
                    <i><sup><b>ID:</b> ${entriesArray[i].ID}</sup></i><br>
                    <b>Time & Date Created: </b><p>${entriesArray[i]['Time & Date']}</p>
                    <b>TITLE: </b><p>${entriesArray[i].Title}</p>
                    <b>BODY: </b><p>${entriesArray[i].Body}</p>
                    <b>DUE: </b><p>${entriesArray[i]['Target Date']}</p>
                    </span><hr>`
                );
                matches = true;
            }
        }

        // Error handling (below, in this function block): Fields missing, incorrect id provided, or missing data.
        if (!(matches)) alert('Entry not found! Cannot FIND.');
        id = document.querySelector('#id-input').value = '';
    } else {
        document.querySelector('#notesOutput').innerHTML = 'Please enter an ID to search for.';
    }
}

// Update existing entry, with any new details inputted by the user, queried by id.
function updateEntry(title, body, targDate, entryID) {
    document.querySelector('#notesOutput').innerHTML = '';
    if (entryID.value) {
        let matches;
        for (let i = 0; i < entriesArray.length; i++) {
            // Find and update queried id.
            if (entryID.value == entriesArray[i].ID) {
                // Append all entries into HTML DOM output.
                document.querySelector('#notesOutput').insertAdjacentHTML('beforeend',
                    `<span class="entries">
                    <i><sup><b>ID:</b> ${entriesArray[i].ID}</sup></i><br>
                    <b>Time & Date Created: </b><p>${entriesArray[i]['Time & Date']}</p>
                    <b>TITLE: </b><p>${entriesArray[i].Title = title.value}</p>
                    <b>BODY: </b><p>${entriesArray[i].Body = body.value}</p>
                    <b>DUE: </b><p>${entriesArray[i]['Target Date'] = targDate.value || entriesArray[i]['Target Date']}</p>
                    </span><hr>`
                );
                matches = true;
            }
        }

        // Error handling (below, in this function block): Fields missing, incorrect id provided, or missing data.
        if (!(matches)) alert('Entry not found! Cannot UPDATE.');
        entryID.value = '';
    } else {
        document.querySelector('#notesOutput').innerHTML = 'Please enter an ID entry to update.';
    }
}

// Delete all the entries currently in our array.
function deleteAll() {
    document.querySelector('#notesOutput').innerHTML = 'All Notes Deleted!';
    entriesArray = [];
}

// Delete a single specified entry from our current array.
function deleteEntry() {
    document.querySelector('#notesOutput').innerHTML = '';
    let id = document.querySelector('#id-input').value;
    if (id) {
        let matches;
        for (let i = 0; i < entriesArray.length; i++) {
            // Find and delete queried id.
            if (id == entriesArray[i].ID) {
                entriesArray.splice(i,1);
                matches = true;
                showAll();
            }
        }

        // Error handling (below, in this function block): Fields missing, incorrect id provided, or missing data.
        if (!(matches)) alert('Entry not found! Cannot DELETE.');
        id = document.querySelector('#id-input').value = '';
    } else {
        document.querySelector('#notesOutput').innerHTML = 'Please enter an ID to delete.';
    }
}