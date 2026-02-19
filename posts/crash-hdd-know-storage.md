Recently my external harddisk crashed abruptly 'file directory is corrupted and unreadable' when i plugged into my windows laptop from engineering days and i was lost for moments. 
- only media copy of my final year engineering days and few family trips.
- had used generous free tier of unlimited google photos storage during initial years of engineering via a desktop plugin - story for another day
- data was precious, instead of playing around, took it to repair shop but for days shop was busy and they didnt cared much.
- quite anxious that if any hiccup i cant trace back my steps. start searching around tools.
- thoughts: any physical fall or abrupt power cut may had write error. most likely data bytes exist but file system cant trace it.
- searched around, tried windows native chkdsk cmd utiliy in admin mode, surprisingly it worked and could recover most of the data back. so happy to restore my media. 
- that was also the day i bought google one subscription and started syncing across my devices. an awakening call indeed.

But how exactly corrupt hard disk was able to recover ?

Here's technical breakdown to understand situation.

thaanks to `chkdsk`

![chkdsk](https://github.com/user-attachments/assets/03d1ed6d-9dc8-4d4d-a606-7f7f09f5c355)




#### Physical Layer:
- At the lowest level, storage media are just vast arrays of addressable slots. However, managing data byte-by-byte (8 bits) is computationally expensive for an Operating System (OS)
- Instead, the OS groups bytes into Sectors (traditionally 512 bytes) and further into Clusters (the smallest unit of logical storage, often 4KB).
- If you save a 1KB file, it still occupies one full 4KB cluster. The "wasted" space is known as Slack Space. The filesystem's job is to keep track of which clusters are "Occupied" and which are "Available."

#### Logical Mappings:
- be it photo or any file, they are sequences of 1s and 0s. filesystem uses Metadata Index to find file instead of scanning entire drive. 
- Windows uses NTFS (New Technology File System) architecture with Master File Table (MFT) metadata index datastructure. (linux uses ext4 with inode tables)
- every file has dedicated row entry in MFT with filename, size, timestamp etc with list of pointers.
- physical addresses (cluster numbers) where the file’s data actually lives. files split across clusters, MFT lists all those cluster pointers. (part-1 at cluster 500, part-2 at cluster 1000, etc)

#### Seatmap of drive - Bitmap:
- a simple binary string where each bit represents one cluster on the drive (0 free, 1 occupied)
- When you delete a file, the OS doesn't usually erase the data in the clusters (which is slow). 
It simply goes to the MFT, 
marks the file entry as "deleted",
flips the corresponding bits in the Bitmap from 1 to 0.
- its why data recovery often works until that space is overwritten by new data.

#### Journalling Filesystems: 
- Before making any changes to the MFT or Bitmap, the OS writes its intention to the Log. task "about to move file X from cluster A to B" and then commits the move. (update MFT and Bitmap)
- logfile resides on hard disk itself, when drive was formatted, allocates specific hidden set of blocks for journal pointed by MFT.
- OS writes to log via filesystem driver, if power failed at 2nd step, leads to inconsistency. a reboot can fix it by replaying the log.

#### What could've happened to my drive? (reboot didnt fixed it)
- Metadata Mismatch: The MFT says a file is in Cluster 100, but the Bitmap says Cluster 100 is "Free."
- Invalid Pointers: An MFT entry points to a cluster address that doesn't exist or belongs to a different file (Cross-linking).

#### How chkdsk fixed it? 
- chkdsk is a low-level utility that bypasses the standard Windows Explorer interface. It directly interacts with the filesystem driver to scan the disk structure.
- every file listed in a folder has to have an MFT entry. 
orphaned data found ?(clusters marked 1 in the Bitmap but not owned by any MFT file), collect into .chk files.
- rebuild bitmap from scratch scanning entire MFT and marking only truly owned clusters as 1.
- but how could it attempt to rebuild the files that was lost from MFT ?     
- even when index gone, filesystems often leave 'crumbs' at cluster beginnings.
- Internal Headers: Many file formats (JPEG, PDF, ZIP, EXE) have a Magic Number at the very first byte (e.g., 0x89 50 4E 47 for a PNG)
- some database-like files incl;ude sequence IDs in footer of each block. "This is block 5 of File ID 109" could reorder them logically.
- Directory Entries: Index Buffer (the data inside a folder) may still lists the file name and the starting cluster. chkdsk uses this to "jumpstart" the recovery.

Hence, Storage is the Synchronization of data bits via architectures (MFT, Bitmap, Journal) and out-of-sync causes corruption of data and chkdsk essentially  a reconciliation algorithm that uses remnants and bits of metadata to restore the logical mappings. 

All this to rewatch my photos and memories via managing bits of 1s and 0s. 
Thanks to tools and this tech!

---

Check your current external HDDs state,

![telegram-cloud-photo-size-5-6104955906148732450-x](https://github.com/user-attachments/assets/4fe8eb11-1563-42fe-ad1d-0445223a9d27)


<img src="https://github.com/user-attachments/assets/4c43e7b0-fff3-47a3-98b8-49568d9c2a01" width="30%" />

